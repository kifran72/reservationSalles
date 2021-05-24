import Mysql from "./mysql";

export default class Services {
    mysql = new Mysql();
    constructor() { }
};