// // @ts-expect-ignore
// export class Api {
//     private username: string;
//     private email: string;
//     private current_session_name: string;

//     constructor(username: string, email: string, current_session_name: string) {
//         this.username = username;
//         this.email = email;
//         this.current_session_name = current_session_name;
//     }

//     async get_user_data() {
//         try {
//             // Assuming you're making an API call to fetch user data
//             const response = await fetch(`https://example.com/api/user/${this.username}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch user data');
//             }
//             return await response.json();
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             throw error; // Re-throw the error for handling at higher level if needed
//         }
//     }
// }
