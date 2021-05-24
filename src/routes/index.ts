import { AdminRoute } from './admin';
import { UserRoute } from './user';
import { SallesRoute } from './salles';

export const routes = (app: any, twing: any, services: any) => {
    app.get( '/', async ( req: any, res: any ) =>
    {
        let testAdmin = await services.mysql.getAdmin();
        if ( testAdmin == undefined) { return res.redirect('/newAdmin'); }
        if ( !req.session.isConnected ) { return res.redirect( '/login' ); }
        let sallesDispo = await services.mysql.getSallesDispo();
        let salles = await services.mysql.getSallesIndisponible();
        let reservation = await services.mysql.getReservation(req.session.user.id_user);
        twing.render( "index.twig", { session: req.session, salles: salles, sallesDispo: sallesDispo, reservation: reservation, titrePage: 'Accueil'}).then((output: any) => {
            return res.end(output);
        });
    } );

    AdminRoute( app, twing, services );
    UserRoute( app, twing, services );
    SallesRoute( app, twing, services );
    
    // ALL OTHER ROUTES REDIRECT TO '/'
    app.get('*', function(req: any, res: any) {
        res.redirect('/');
    });
};