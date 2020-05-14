<template>
  <ContentWrapper>
    <div class="card b">
        <div class="card-header bg-gray-lighter text-bold">Profile</div>
        <div class="card-body">
            <form v-on:submit.prevent="onSubmit('profileForm')" data-vv-scope="profileForm">
                <div class="form-group">
                    <label>Email</label>
                    <input class="form-control" type="text" v-model="profileForm.email" />
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <input class="form-control" type="text" v-model="profileForm.fname" />
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input class="form-control" type="text" v-model="profileForm.lname" />
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input class="form-control" type="text" v-model="profileForm.phone" />
                </div>
                <div class="form-group">
                    <label>Skype</label>
                    <input class="form-control" type="text" v-model="profileForm.skype" />
                </div>
                <div class="form-group">
                    <label>Facebook</label>
                    <input class="form-control" type="text" v-model="profileForm.facebook" />
                </div>
                <div class="form-group">
                    <label>Twitter</label>
                    <input class="form-control" type="text" v-model="profileForm.twitter" />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input :class="{'form-control':true, 'is-invalid': errors.has('profileForm.password')}" type="password" v-validate="'required'" v-model="profileForm.password" name="password" />
                    <span v-show="errors.has('profileForm.password')" class="invalid-feedback">{{ errors.first('profileForm.password') }}</span>
                </div>
                <button 
                  v-bind:disabled="errors.any()"
                  class="btn btn-info"
                  type="submit">Update profile</button>
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
        profileForm: {
          email: null,
          fname: null,
          lname: null,
          phone: null,
          skype: null,
          facebook: null,
          twitter: null,
          password: null
        }
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.$store.dispatch(
            profileTypes.namespacedActions.fetchPersonalProfile)
          .then(profile => {
            this.profileForm = {
              email: profile.email,
              fname: profile.fname,
              lname: profile.lname,
              phone: profile.phone,
              skype: profile.skype,
              facebook: profile.facebook,
              twitter: profile.twitter,
              password: null
            }
          });
      },
      onSubmit(scope) {
        this.$validator.validateAll(scope).then((result) => {
            if (result) {
              const data = {
                email: this.profileForm.email,
                fname: this.profileForm.fname,
                lname: this.profileForm.lname,
                phone: this.profileForm.phone,
                skype: this.profileForm.skype,
                facebook: this.profileForm.facebook,
                twitter: this.profileForm.twitter,
                password: this.profileForm.password
              };

              this.$store.dispatch(
                profileTypes.namespacedActions.updatePersonalProfile, data);
            }
        });
      }
    }
  }
</script>