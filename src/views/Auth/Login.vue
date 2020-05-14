<template>
    <div class="block-center mt-4 wd-xl">
        <!-- START card-->
        <div class="card card-flat">
            <div class="card-header text-center bg-dark">
              <p></p>
            </div>
            <div class="card-body">
              <form class="mb-3" v-on:submit.prevent="onSubmit('loginForm')" data-vv-scope="loginForm">
                  <div class="form-group">
                      <div class="input-group with-focus">
                          <input :class="{'form-control border-right-0':true, 'is-invalid': errors.has('loginForm.username')}" placeholder="Username" v-model="loginForm.username" v-validate="'required'" type="text" name="username"/>
                          <div class="input-group-append">
                              <span class="input-group-text text-muted bg-transparent border-left-0">
                                  <em class="fa fa-user"></em>
                              </span>
                          </div>
                          <span v-show="errors.has('loginForm.username')" class="invalid-feedback">{{ errors.first('loginForm.username') }}</span>
                      </div>
                  </div>
                  <div class="form-group">
                      <div class="input-group with-focus">
                          <input :class="{'form-control border-right-0':true, 'is-invalid': errors.has('loginForm.password')}" v-model="loginForm.password" v-validate="'required'" type="password" name="password" placeholder="Password"/>
                          <div class="input-group-append">
                              <span class="input-group-text text-muted bg-transparent border-left-0">
                                  <em class="fa fa-lock"></em>
                              </span>
                          </div>
                          <span v-show="errors.has('loginForm.password')" class="invalid-feedback">{{ errors.first('loginForm.password') }}</span>
                      </div>
                  </div>
                  <button
                    v-bind:disabled="errors.any()"
                    class="btn btn-block btn-primary mt-3"
                    type="submit">Login</button>
              </form>
            </div>
        </div>
        <!-- END card-->
        <div class="p-3 text-center">
          <span>&copy; 2018 - EvobitsIT</span>
        </div>
    </div>
</template>

<script>

import authTypes from "@/store/auth/types";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    onSubmit(scope) {
      this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.$store
              .dispatch(authTypes.namespacedActions.login, this.loginForm)
              .then(() => {
                const redirectUrl = this.$store.state.route.query.redirectUrl || "/";
                this.$router.push({
                  path: decodeURIComponent(redirectUrl)
                });
              });
          }
      });
    }
  }
};
</script>
