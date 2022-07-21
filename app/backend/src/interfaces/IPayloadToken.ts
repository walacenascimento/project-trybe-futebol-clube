interface IPayloadToken {
  user: {
    id: number,
    username: string,
    email: string,
    password: string,
    role: string,
  }
}

export default IPayloadToken;
