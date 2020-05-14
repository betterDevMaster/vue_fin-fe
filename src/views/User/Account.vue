<template>
  <ContentWrapper>
    <div class="card b">
        <div class="card-header bg-gray-lighter text-bold">Account</div>
        <div class="card-body">
            <form v-on:submit.prevent="onSubmit('passwordForm')" data-vv-scope="passwordForm">
                <div class="form-group">
                    <label>Password</label>
                    <input :class="{'form-control':true, 'is-invalid': errors.has('passwordForm.password')}" type="password" v-validate="'required'" v-model="passwordForm.password" name="password" ref="password" />
                    <span v-show="errors.has('passwordForm.password')" class="invalid-feedback">{{ errors.first('passwordForm.password') }}</span>
                </div>
                <div class="form-group">
                    <label>New password</label>
                    <input :class="{'form-control':true, 'is-invalid': errors.has('passwordForm.newPassword')}" type="password" v-validate="'required'" v-model="passwordForm.newPassword" name="newPassword" ref="newPassword" />
                    <span v-show="errors.has('passwordForm.newPassword')" class="invalid-feedback">{{ errors.first('passwordForm.newPassword') }}</span>
                </div>
                <div class="form-group">
                    <label>Confirm new password</label>
                    <input :class="{'form-control':true, 'is-invalid': errors.has('passwordForm.confirmNew')}" type="password" v-validate="'required|confirmed:newPassword'" v-model="passwordForm.confirmNew" name="confirmNew" />
                    <span v-show="errors.has('passwordForm.confirmNew')" class="invalid-feedback">{{ errors.first('passwordForm.confirmNew') }}</span>
                </div>
                <button
                    v-bind:disabled="errors.any()"
                    class="btn btn-info"
                    type="submit">Update password</button>
            </form>
        </div>
    </div>
  </ContentWrapper>
</template>

<script>
  import profileTypes from "@/store/profile/types";

  export default {
    data() {
      return {
        passwordForm: {
          password: null,
          newPassword: null,
          confirmNew: null
        }
      };
    },
    methods: {
      onSubmit(scope) {
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.$store
              .dispatch(
                profileTypes.namespacedActions.changePassword,
                this.passwordForm);
          }
        });
      }
    }
  }
</script>