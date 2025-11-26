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

    const fetchRepositories = async () => {
        // Mock data for now since we don't have a real token
        console.log("Mocking fetch repositories...");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'readme-generator', full_name: 'user/readme-generator' },
                    { id: 2, name: 'awesome-project', full_name: 'user/awesome-project' },
                    { id: 3, name: 'react-app', full_name: 'user/react-app' },
                ]);
            }, 1000);
        });
    };

    const fetchFileContent = async (repoFullName, path) => {
        console.log(`Mocking fetch file ${path} from ${repoFullName}...`);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("# Imported README\n\nThis is a mocked imported readme content.");
            }, 1000);
        });
    };

    const createPullRequest = async (repoFullName, title, body, head, base = 'main') => {
        console.log(`Mocking PR creation in ${repoFullName}...`);
        console.log(`Title: ${title}`);
        console.log(`Head: ${head}, Base: ${base}`);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: "Mock PR created successfully!",
                    html_url: `https://github.com/${repoFullName}/pull/1`
                });
            }, 1500);
        });
    };

    return { user, loading, login, logout, pushToRepo, fetchRepositories, fetchFileContent, createPullRequest };
};
