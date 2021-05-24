import session from "express-session";

export const SallesRoute = (app: any, twing: any, services: any) => {
    app.get( '/gestionSalles', async ( req: any, res: any ) =>
    {
        let testAdmin = await services.mysql.getAdmin();
        if ( testAdmin == undefined) { return res.redirect('/newAdmin'); }
        if ( !req.session.isConnected ) { return res.redirect( '/' ); }
        if ( req.session.user.role === 0) { return res.redirect( '/' ); }
        let salles = await services.mysql.getSalles();
        twing.render("gestionSalles.twig", { salles: salles, titrePage: 'Gestion des salles' , session: req.session }).then((output: any) => {
            return res.end(output);
        });
    } );
    
    app.post( '/addSalle', async ( req: any, res: any ) =>
    {
        let salle = req.body;
        let testSelectSalles = await services.mysql.selectSalle(salle);
        if ( testSelectSalles.length === 0 )
        {
            let insertSalle = await services.mysql.insertSalle( salle )
            if ( insertSalle.affectedRows )
            {
                res.send({ error: false });
            } else
            {
                res.send({ error: true })
            }
        } else {
            res.send({ error: true })
        }
    } );
    
    app.post( '/editSalle', async ( req: any, res: any ) =>
    {
        let salle = req.body;
        let testSelectSalles = await services.mysql.selectSalle( salle );
        if ( testSelectSalles.length === 0 )
        {
            let testUpdateSalles = await services.mysql.updateSalle(salle);
        if ( testUpdateSalles.affectedRows !== 0 )
        {
            res.send({ error: false });
        } else {
            res.send({ error: true })
        }
        } else
        {
            res.send({ error: true });
        }
        
    } );
    
    app.post( '/deleteSalle', async ( req: any, res: any ) =>
    {
        let id_salle = req.body;
        let testDelete = await services.mysql.deleteSalle(id_salle);
        if (testDelete.affectedRows !== 0) {
            res.send({
                session: req.session,
                error: false
            });
        } else {
            res.send( {
                error: true
            })
        }
    } );
    
    app.post( '/reservation', async ( req: any, res: any ) =>
    {
        let infoReservation = req.body;
        let testDelete = await services.mysql.reserverSalle(infoReservation);
        if (testDelete.affectedRows !== 0) {
            res.send({
                session: req.session,
                error: false
            });
        } else {
            res.send( {
                error: true
            })
        }
    } );
    
    app.post( '/deleteReservation', async ( req: any, res: any ) =>
    {
        let infoReservation = req.body;
        let testDelete = await services.mysql.deleteReservation(infoReservation);
        if (testDelete.affectedRows !== 0) {
            res.send({
                session: req.session,
                error: false
            });
        } else {
            res.send( {
                error: true
            })
        }
    });
}