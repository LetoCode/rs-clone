export default function signUpForm() {
   return `
  <div class="authentication__sign-up">
    <h2>I don't have an account</h2>
    <h1 class="authentication__title">Sign up with your email and password</h1>
    <form class="signUpForm" action="">
      <label class="input-label" for="">Display name</label>
      <input class="signUpInputs" type="text" name="displayName" required />
      <label for="">Email</label>
      <input class="signUpInputs" type="email" name="email" required />
      <label class="input-label" for="">Password</label>
      <input class="signUpInputs" type="password" name="password" required />
      <label class="input-label" for="">Confrim password</label>
      <input class="signUpInputs" type="password" name="confirmPassword" required />
      <button class="sign-up-btn sign-btn" type="submit">Sign Up</button>
    </form>
  </div>
  `;
}
