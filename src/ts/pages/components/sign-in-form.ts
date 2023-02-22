export default function signInForm() {
   return `
   <div class="authentication__sign-in">
      <h2>I already have an account</h2>
      <h1 class="authentication__title">Sign in with your email and password</h1>
      <form>
        <label class="input-label" for="">Email</label>
        <input class="signInInputs" type="email" name="email" required />
        <label class="input-label" for="">Password</label>
        <input class="signInInputs" type="password" name="password" required />
        <div class="buttons-container">
          <button class="signIn sign-btn" type="submit">Sign in</button>
          <button class="signInWithGoogle sign-btn" type="button">Sign in with Google</button>
        </div>
      </form>
   </div>
   `;
}
