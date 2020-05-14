<template>
  <ContentWrapper>
    <div class="container-md">
      <div class="row">
        <div class="col-lg-3">
          <div class="card b">
            <div class="card-header bg-gray-lighter text-bold">Personal Settings</div>
            <div class="list-group">
              <a class="list-group-item list-group-item-action"
                  href="#"
                  :class="this.activeTab === 'profile' ? 'active':''"
                  @click="toggleTab('profile')">Profile</a>
              <a class="list-group-item list-group-item-action"
                  href="#"
                  :class="this.activeTab === 'account' ? 'active':''"
                  @click="toggleTab('account')">Account</a>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div v-show="this.activeTab == 'profile'">
            <Profile />
          </div>
          <div v-show="this.activeTab == 'account'">
            <Account />
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
import Account from "./Account";
import Profile from "./Profile";

export default {
  data() {
    return {
      activeTab: 'profile'
    }
  },
  components: {
    Account,
    Profile
  },
  methods: {
    toggleTab (tab) {
      if (this.activeTab !== tab) {
        this.activeTab = tab
      }
    }
  }
}
</script>
