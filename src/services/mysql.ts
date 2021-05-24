import chalk from 'chalk';
import * as mysql from 'mysql'

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'reservationssalles'
  });

export default class Mysql {
    constructor() { this.connect(); }

    connect() {
        try
        {
            connection.connect(() => {
                console.log( chalk.green( 'BDD connected' ) );
            });
        } catch ( err )
        {
            chalk.red( err );
        }
    }

    selectAllUsers ()
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "SELECT * FROM users WHERE role!=1";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results)  ;
              });
        } );
     
    }
    
    selectLogin ( user: any )
    {

        return new Promise( ( resolve, reject ) =>
        {
         
            const query = "SELECT * FROM users WHERE email='" + user.email + "'OR nickname='"+ user.email +"' AND password='" + user.password + "'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results[0])  ;
              });
        } );
     
    }

    selecSignup ( data: any )
    {
        return new Promise( ( resolve, reject ) =>
        {
            const user = { email: data.email, nickname: data.nickname };
            const query = "SELECT id_user, email , nickname, role FROM users WHERE email='"+ user.email+"' AND nickname='"+ user.nickname +"'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });
        } );
    }

    insertSignup ( data: any )
    {
        return new Promise( ( resolve, reject ) =>
        {
            const user = { email: data.email, nickname: data.nickname, password: data.password }
            const query = "INSERT INTO users (email, nickname, password) VALUES('" + user.email+ "', '"+ user.nickname +"','" + user.password + "')" ;
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });  
        } );
    }

    getSalles ()
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "SELECT * FROM salles";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results)  ;
              });
        } );
     
    }

    getSallesIndisponible ()
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "SELECT * FROM salles WHERE id_user IS NOT NULL";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results)  ;
              });
        } );
     
    }

    getSallesDispo ()
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "SELECT * FROM salles WHERE id_user IS NULL";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results)  ;
              });
        } );
     
    }

    getAdmin ()
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "SELECT nickname, email, id_user, role FROM users WHERE role=1";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results[0]);
              });  
        } );
    }

    insertSalle ( salle: any )
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "INSERT INTO salles (sport, nb_place, description, nom_salle) VALUES('" + salle.sport + "','" + salle.nb_place + "', '" + salle.description + "','" + salle.nom_salle + "')";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });  
        } );
    }

    deleteSalle (id_salle: any) {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "DELETE FROM salles WHERE id_salle='"+ parseInt(id_salle.id_salle) +"'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results)  ;
              });
        } );
    }
    
    selectSalle ( salle: any )
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "SELECT * FROM salles WHERE nom_salle='"+ salle.nom_salle+"'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results)  ;
              });
        } );
    }

    updateSalle ( salle: any )
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "UPDATE salles SET nom_salle='"+ salle.nom_salle +"', sport='"+ salle.sport +"', nb_place='"+ parseInt(salle.nb_place) +"', description='"+ salle.description +"' WHERE id_salle='" + parseInt(salle.id_salle) + "'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });  
        } );
    }

    createAdmin ( user: any )
    {
        return new Promise( ( resolve, reject ) =>
        {
            
            const query = "INSERT INTO users (email, nickname, password, role) VALUES('" + user.email+ "','"+ user.nickname +"','" + user.password + "', '1')" ;
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });  
        } );
    }

    manageUsers (user: any)
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "UPDATE users SET role="+ user.role +" WHERE email='" + user.email + "'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });  
        } );
    }

    reserverSalle ( infoReservation: any )
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "UPDATE salles SET id_user="+ infoReservation.id_user +" WHERE id_salle='" + infoReservation.id_salle + "'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });  
        } ); 
    }

    deleteReservation ( infoReservation: any )
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "UPDATE salles SET id_user=NULL WHERE id_salle='" + infoReservation.id_salle + "'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });  
        } ); 
    }

    getReservation (userId: any)
    {
        return new Promise( ( resolve, reject ) =>
        {
            const query = "SELECT * from salles WHERE id_user='"+ userId +"'";
            connection.query(query , ( error: any, results: any) => {
                if ( error ) throw reject(error);
                resolve(results);
              });  
        } ); 
    }

    close ()
    {
        connection.connect();
    }
};