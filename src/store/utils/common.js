import {
  updateEntity,
  updateEntities,
  deleteEntity
} from '@/store/utils/mutation-functions';
import notificationTypes from '@/store/notifications/types';

export function createState() {
  return {
    entities: [],
    byId: {},
    selectedEntityId: null
  };
}

export function createGetters(types) {
  return {
    [types.getters.entityById]: state => id => state.byId[id],
    [types.getters.entities]: state =>
      state.entities.map(entityId => state.byId[entityId]),
    [types.getters.selectedEntityId]: state => state.selectedEntityId,
    [types.getters.selectedEntity]: (state, localGetters) => {
      const selectedEntityId = localGetters[types.getters.selectedEntityId];
      return localGetters[types.getters.entityById](selectedEntityId);
    }
  };
}

export function createMutations(types) {
  return {
    [types.mutations.updateEntities]: (state, { entities }) =>
      updateEntities(state, entities),
    [types.mutations.updateEntity]: (state, { entity }) => {
      updateEntity(state, entity);
    },
    [types.mutations.deleteEntity]: (state, { entityId }) => {
      deleteEntity(state, entityId);
    }
  };
}

export function notifyServerError(commit, { body, title, config } = {}) {
  commit(
    notificationTypes.namespacedMutations.error,
    {
      body: body || 'An unknown server error occurred.',
      title,
      config
    },
    { root: true }
  );
}

export function handleServerErrorResponse(commit, response) {
  if (response && response.status === 400) {
    notifyServerError(commit, { body: response.data.error });
  } else if (response && response.status === 401) {
    notifyServerError(commit, { body: 'Invalid user credentials.' });
  } else if (response && response.status === 403) {
    notifyServerError(commit, { body: 'Login session timed out.' });
  } else {
    notifyServerError(commit);
  }
}
