import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from '../../redux/actions/user.actions.jsx';
import User from '../../components/User.jsx';
import Account from '../../components/Account.jsx';
import AccountCardData from '../../data/AccountCardData.json';

/* Page de profil d'utilisateur */
function UserProfile () {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    /* Fonction asynchrone qui récupère les données utilisateur et les met à jour avec useEffect */
    useEffect(() => {
        if (token) {
            const userData = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        /* 
                            Vérifier que la réponse à la requête est bien récupérée
                            console.log(données)
                        */
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName
                        }
                        /* Renvoie les données utilisateur dans l'état redux */
                        dispatch(userProfile(userData));
                    } else {
                        console.log("error while retrieving profile");
                    }
                } catch (error) {
                    console.error(error);
                };
            };
            userData();
        }
    }, [dispatch, token]);

    return (
        <div className='profile-page'>
            <main className='bg-dark'>
                {/* Return user componant */}
                < User />
                {/* Renvoie les éléments du fichier json avec la carte */}
                {AccountCardData.map((data) => (
                    /* Composant de compte de retour */
                    <Account 
                        key={data.id}
                        title={data.title}
                        amount={data.amount}
                        description={data.description}
                    />
                ))}
            </main>
        </div>
    )
}

export default UserProfile