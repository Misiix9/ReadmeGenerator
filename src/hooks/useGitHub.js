import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, GithubAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const useGitHub = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async () => {
        const provider = new GithubAuthProvider();
        provider.addScope('repo'); // Request access to write to repos
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Check console for details.");
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const pushToRepo = async (repoName, content, branch = 'main') => {
        if (!user) return;

        // Note: In a real app, we would need the OAuth Access Token.
        // Firebase Auth provides this in the signInWithPopup result (credential.accessToken).
        // However, persisting it securely for later use (like here) requires more complex state management 
        // or re-authenticating. 
        // For this demo, we will mock the API call success if the user is logged in.

        console.log(`Mocking push to ${repoName} on branch ${branch}...`);
        console.log("Content length:", content.length);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: "Mock push successful!" });
            }, 1500);
        });
    };

    return { user, loading, login, logout, pushToRepo };
};
