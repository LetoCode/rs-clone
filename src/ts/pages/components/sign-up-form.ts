export default function signUpForm() {
   return `
  <div class="authentication__sign-up">
    <h2>I don't have an account</h2>
    <h1 class="authentication__title">Sign up with your email and password</h1>
    <form class="authentication__sign-up-form">
    <label class="authentication__input-label" for="">Display name</label>
    <input class="authentication__sign-up-inputs" type="text" name="displayName" required />
    <label class="authentication__input-label">Email</label>
    <input class="authentication__sign-up-inputs" type="email" name="email" required />
    <label class="authentication__input-label">Password</label>
    <input class="authentication__sign-up-inputs" type="password" name="password" required />
    <label class="authentication__input-labell">Confrim password</label>
    <input class="authentication__sign-up-inputs" type="password" name="confirmPassword" required />
    <button class="authentication__sign-up-btn sign-btn" type="submit">Sign Up</button>
    </form>
  </div>
  `;
}
