<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog
      :show="isLoading"
      title="Wait to authenticate"
      fixed
      @close="handleError"
    >
      <base-spinner></base-spinner>
    </base-dialog>
    <div class="flex flex-col md:flex-row">
      <transition name="signup">
        <div v-if="mode === 'signup'" class="w-full md:w-1/3 bg-red-500 p-8">
          <div class="flex flex-col justify-start items-center h-full">
            <p class="text-white text-xl md:text-2xl mb-7">One of us?</p>
            <p class="text-white text-base md:text-xl px-3">
              If you already have an account, just sign in. We've missed you!
            </p>
            <div class="mt-auto">
              <base-button
                mode="btn-flat"
                type="button"
                @click="switchAuthMode"
                >{{ switchModeButtonCaption }}</base-button
              >
            </div>
          </div>
        </div>
      </transition>

      <div
        class="flex flex-col flex-1 justify-center items-center h-full p-0 md:p-11"
      >
        <p class="text-2xl my-5 font-bold text-center text-yellow-500">
          {{ formHeadCaption }}
        </p>
        <form @submit.prevent="submitFom" class="w-full md:w-10/12">
          <div class="flex flex-col justify-center items-center">
            <span
              v-if="mode === 'signup'"
              class="w-full flex flex-col justify-center items-center"
            >
              <label for="name" class="text-gray-400 mt-7">Name</label>
              <input
                type="text"
                id="name"
                v-model.trim="name"
                class="border-gray-200 border-b-2 border-t-0 w-10/12 h-12 text-center font-medium outline-none"
              />
            </span>
            <label for="email" class="text-gray-400 mt-7">E-mail</label>
            <input
              type="email"
              id="email"
              v-model.trim="email"
              class="border-gray-200 border-b-2 border-t-0 w-10/12 h-12 text-center font-medium outline-none"
            />
            <label for="password" class="text-gray-400 mt-7 text-center"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model.trim="password"
              class="border-gray-200 border-b-2 border-t-0 w-10/12 h-12 text-center font-medium outline-none"
            />

            <base-button
              link
              :to="{ name: 'forgot-password' }"
              v-if="mode === 'login'"
              >Forgot password?
            </base-button>

            <!-- <p v-if="!formIsValid">
            Please enter a valid and password (must be at least
            {{ passwordLength }} characters long)
          </p> -->
            <base-button mode="btn-outline">{{
              submitButtonCaption
            }}</base-button>
          </div>
        </form>
      </div>
      <transition name="login">
        <div
          class="w-full md:w-1/3 bg-red-500 p-8"
          v-if="mode === 'login' && animate"
        >
          <div class="flex flex-col justify-start items-center h-full">
            <p class="text-white text-xl md:text-2xl mb-7">New here?</p>
            <p class="text-white text-base md:text-xl px-3">
              Sign up and start practicing or take an quiz!
            </p>
            <div class="mt-auto">
              <base-button
                mode="btn-flat"
                type="button"
                @click="switchAuthMode"
                >{{ switchModeButtonCaption }}</base-button
              >
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordLength: 8,
      formIsValid: true,
      mode: "login",
      animate: false,
      isLoading: null,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "SIGN IN";
      } else {
        return "SIGN UP";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "SIGN UP INSTEAD";
      } else {
        return "SIGN IN INSTEAD";
      }
    },
    formHeadCaption() {
      return this.mode === "login" ? "Welcome back" : "Time to feel like home";
    },
  },
  mounted() {
    this.animate = true;
  },
  methods: {
    async submitFom() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < this.passwordLength
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;

      try {
        if (this.mode === "login") {
          //
        } else if (this.mode === "signup") {
          await this.$store.dispatch("auth/signup", {
            email: this.email,
            username: this.name,
            password: this.password,
          });
        }
      } catch (error) {
        this.error =
          error.response.data.errors[0] ||
          "Fail to authenticate. Please try later or contact administrator.";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>


<style scoped>
.signup-enter-from {
  opacity: 0;
  transform: translateX(400px);
}

.signup-leave-to {
  opacity: 0;
  transform: translateX(400px);
  position: absolute;
  height: 470px;
  display: flex;
  flex-direction: column;
}

.signup-enter-active {
  transition: all 0.3s ease-in-out;
}

.signup-leave-active {
  transition: all 0.3s ease-in-out;
}

.signup-enter-to,
.signup-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.login-enter-from {
  opacity: 0;
  transform: translateX(-400px);
}

.login-leave-to {
  opacity: 0;
  transform: translateX(-400px);
  position: absolute;
  right: 0;
  height: 470px;
  display: flex;
  flex-direction: column;
}

.login-enter-active {
  transition: all 0.3s ease-in-out;
}

.login-leave-active {
  transition: all 0.3s ease-in-out;
}

.login-enter-to,
.login-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>