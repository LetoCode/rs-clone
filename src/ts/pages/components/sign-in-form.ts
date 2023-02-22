export default function signInForm() {
   return `
   <div class="authentication__sign-in">
      <h2>I already have an account</h2>
      <h1 class="authentication__title">Sign in with your email and password</h1>
      <form>
        <label class="authentication__input-label" for="">Email</label>
        <input class="authentication__sign-in-inputs" type="email" name="email" required />
        <label class="authentication__input-label" for="">Password</label>
        <input class="authentication__sign-in-inputs" type="password" name="password" required />
        <div class="authentication__buttons-container">
          <button class="authentication__sign-email sign-btn" type="submit">Sign in</button>
          <button class="authentication__sign-google sign-btn" type="button">Sign in with Google</button>
        </div>
      </form>
   </div>
   `;
}
