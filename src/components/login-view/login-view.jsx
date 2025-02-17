export const LoginView = () => {
  return (
    <form>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
