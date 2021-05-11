<template>
  <form @submit.prevent="submitFom">
    <div>
      <label for="email">E-mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model.trim="password" />
    </div>
    <p v-if="!formIsValid">
      Please enter a valid and password (must be at least
      {{ passwordLength }} characters long)
    </p>
    <button>{{ submitButtonCaption }}</button>
    <button type="button" @click="switchAuthMode">
      {{ switchModeButtonCaption }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordLength: 8,
      formIsValid: true,
      mode: "login",
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    submitFom() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < this.passwordLength
      ) {
        this.formIsValid = false;
        return;
      }

      // send http req
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>