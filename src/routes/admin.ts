export const AdminRoute = (app: any, twing: any, services: any) => {
    app.get( '/newAdmin', async ( req: any, res: any ) =>
    {
        let testAdmin = await services.mysql.getAdmin();
        if ( testAdmin !== undefined ) { return res.redirect('/'); }
        twing.render("newAdmin.twig", { titrePage: 'Creation Admin' }).then((output: any) => {
            return res.end(output);
        });
    } );
    
    app.post( '/newAdmin', async ( req: any, res: any ) =>
    {
        let admin = req.body;
        let testCreateAdmin = await services.mysql.createAdmin(admin);
        if ( testCreateAdmin )
        {
            let testAdmin = await services.mysql.getAdmin();
            req.session.isConnected = true;
            req.session.user = testAdmin;
            req.session.save();
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