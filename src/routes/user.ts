export const UserRoute = (app: any, twing: any, services: any) => {
    app.get( '/login', async ( req: any, res: any ) =>
    {
        let testAdmin = await services.mysql.getAdmin();
        if ( testAdmin == undefined) { return res.redirect('/newAdmin'); }
        if ( req.session.isConnected ) { return res.redirect( '/' ); }
        twing.render("user/login.twig", { titrePage: 'Connexion' }).then((output: any) => {
            res.end(output);
        });
    });

    app.post('/login', async (req: any, res: any) => {
        let user = req.body;
        let test = await services.mysql.selectLogin( user );
        if ( test )
        {
            req.session.isConnected = true;
            req.session.user = {
                id_user: test.id_user,
                email: test.email,
                nickname: test.nickname,
                role: test.role
            };
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

    app.get( '/signup', async ( req: any, res: any ) =>
    {
        let testAdmin = await services.mysql.getAdmin();
        if ( testAdmin == undefined) { return res.redirect('/newAdmin'); }
        if ( req.session.isConnected ) { return res.redirect( '/' ); }
        twing.render( "user/signup.twig", { titrePage: 'Inscription' }).then((output: any) => {
            res.end(output);
        });
    });

    app.post('/signup', async (req: any, res: any) => {
        let user = req.body;
        let test = await services.mysql.selecSignup( user );
        if (test.length === 0) {
            let insert = await services.mysql.insertSignup( user );
            if ( insert )
            {
                let userResult = await services.mysql.selecSignup( user );
                req.session.isConnected = true;
                req.session.user = {
                    id_user: userResult[ 0 ].id_user,
                    nickname: userResult[ 0 ].nickname,
                    email: userResult[ 0 ].email,
                    role: userResult[0].role
                };;
                req.session.save();
                res.send({
                    session: req.session,
                    error: false
                });
            }
        } else {
            res.send({
                error: true
            });
        }
    } );

    app.get( '/logout', async ( req: any, res: any ) =>
    {
        let testAdmin = await services.mysql.getAdmin();
        if ( testAdmin == undefined) { return res.redirect('/newAdmin'); }

        req.session.destroy();
        return res.redirect( '/' );
    });
    
    app.get( '/manageUsers', async ( req: any, res: any ) =>
    {
        let testAdmin = await services.mysql.getAdmin();
        if ( testAdmin == undefined) { return res.redirect('/newAdmin'); }
        if ( !req.session.isConnected ) { return res.redirect( '/' ); }
        if ( req.session.user.role === 0 || req.session.user.role === 2) { return res.redirect( '/' ); }
        const allUsers = await services.mysql.selectAllUsers();
        twing.render("user/manageUsers.twig", { users: allUsers, titrePage: 'Gérer les utilisateurs',  session: req.session }).then((output: any) => {
            res.end(output);
        });
    });
    
    app.post( '/manageUsers', async ( req: any, res: any ) =>
    {
        const user = req.body;
        const update = await services.mysql.manageUsers( user );
        if ( update )
        {
            res.send({
                error: false
            });
        } else
        {
            res.send({
                error: true
            });
        }
    } );
    
}