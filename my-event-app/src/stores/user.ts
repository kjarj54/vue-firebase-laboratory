import { defineStore } from 'pinia';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import router from '../router';

interface UserData {
  email: string | null;
  uid: string;
  role: string | null;
}

interface State {
  userData: UserData | null;
  loadingUser: boolean;
  loadingSession: boolean;
}

export const useUserStore = defineStore('userStore', {
  state: (): State => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser(email: string, password: string): Promise<void> {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        this.userData = { email: user.email, uid: user.uid, role: null };
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: "staff"
        });
        router.push("/");
      } catch (error) {
        alert("No se puede registrar en este momento.");
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email: string, password: string): Promise<boolean> {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        await this.setUserRole(user.uid);
        this.userData = { email: user.email, uid: user.uid, role: this.userData?.role ?? null };
        return true;
      } catch (error) {
        alert("Credenciales no válidos");
        return false;
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser(): Promise<void> {
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        router.push("/login");
      }
    },
    async currentUser(): Promise<UserData | null> {
      this.loadingSession = true;
      try {
        const user = await new Promise<User | null>((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(
            auth,
            async (user) => {
              unsubscribe();
              if (user) {
                await this.setUserRole(user.uid);
                resolve(user);
              } else {
                resolve(null);
              }
            },
            (error) => {
              unsubscribe();
              reject(error);
            }
          );
        });

        if (user) {
          this.userData = { email: user.email, uid: user.uid, role: this.userData?.role ?? null };
        } else {
          this.userData = null;
        }

        return this.userData;
      } catch (error) {
        return null;
      } finally {
        this.loadingSession = false;
      }
    },
    async setUserRole(uid: string) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const role = docSnap.data().role as string;
        this.userData = {
          email: this.userData?.email ?? null,
          uid: this.userData?.uid ?? '',
          role: role ?? null
        };
      }

    }
  },
});
