import baseRepoClass from "../Repository/baseRepoClass";
class userClass extends baseRepoClass {
  constructor() {}
  baseRepo = new baseRepoClass();
  getAllUser() {
    const data = this.baseRepo.findUsers();
    console.log("interface : ", data);
    return data;
  }
}
export default new userClass();
