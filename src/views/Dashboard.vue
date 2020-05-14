<template>
    <ContentWrapper>
        <div class="content-heading">
            <div>{{$t("dashboard.DASHBOARD")}}
                <small>{{$t("dashboard.WELCOME")}}</small>
            </div>
            <!-- START Language list-->
            <div class="ml-auto">
                <b-dropdown :text="selectedLanguage()" no-caret right>
                    <b-dropdown-item @click="changeLanguage('en')">English</b-dropdown-item>
                </b-dropdown>
            </div>
            <!-- END Language list-->
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="text-thin">{{$t("dashboard.DASHBOARD")}}</h2>
                <p v-html="$t('dashboard.DESCRIPTION')"></p>
            </div>
        </div>
    </ContentWrapper>
</template>

<script>
  export default {
    data() {
      return {
        selectedLanguage() {
          switch(this.$i18n.i18next.language) {
            case 'en': default: return 'English';
          }
        }
      }
    },
    methods: {
      changeLanguage (lang) {
          this.$i18n.i18next.changeLanguage(lang);
      }
    }
  }
</script>