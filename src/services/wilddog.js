import wilddog from 'wilddog';
const config = {
    authDomain: "wd3297958378ddqcob.wilddog.com",
    syncURL: "https://wd3297958378ddqcob.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);

export const root_ref = wilddog.sync().ref("/web/official");
export const head_banner_ref = wilddog.sync().ref("/web/official/head_banner");
export const auth = wilddog.auth();
export const currentUser = wilddog.auth().currentUser;

console.log(currentUser);



export function wilddogPromise(ref,event){
    return new Promise(function (resolve,reject) {
      ref.on(event,function (snapshot) {
        resolve(snapshot);
      },function(err){
        reject(err);
      });
    });
}
