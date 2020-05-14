import Vue from 'vue';

export function updateEntities(state, entities) {
  const map = {};
  const ids =
    entities.map(entity => {
      map[entity.id] = entity;
      return entity.id;
    }) || [];

  Vue.set(state, 'entities', ids);
  Vue.set(state, 'byId', map);
}

export function updateEntity(state, entity) {
  if (entity) {
    Vue.set(state.byId, entity.id, entity);
    Vue.set(state, 'selectedEntityId', entity.id);
  }
}

export function deleteEntity(state, id) {
  Vue.delete(state.byId, id);
  const ids = state.entities.filter(entityId => entityId !== id);
  Vue.set(state, 'entities', ids);
}

export function updateEntityProperty(
  state,
  { entityId, propertyName, propertyValue }
) {
  const entity = state.byId[entityId];
  entity[propertyName] = propertyValue;
  Vue.set(state.byId, entityId, entity);
}
