import { Menu, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";
import { UserCard } from "./components/user-card";

interface UsersProps {
     id: number;
     uuid: string;
     firstname: string;
     lastname: string;
     username: string;
     password: string;
     email: string;
     ip: string;
     macAddress: string;
     website: string;
     image: string;
}

export function App() {
     const [users, setUsers] = useState<UsersProps[] | null>(null);
     const [menuOpen, setMenuOpen] = useState(false);

     const [visibleUsers, setVisibleUsers] = useState<UsersProps[]>([]);
     const [itemsToShow, setItemsToShow] = useState(21);

     useEffect(() => {
          api.get("users?_quantity=1000").then((response) => {
               const fetchedUsers = response.data.data;
               setUsers(fetchedUsers);
               setVisibleUsers(fetchedUsers.slice(0, itemsToShow));
          });
     }, []);

     useEffect(() => {
          if (users) setVisibleUsers(users.slice(0, itemsToShow));
     }, [itemsToShow, users]);

     function handleShowMore() {
          setItemsToShow((prev) => prev + 21);
     };

     return (
          <div className="flex flex-col h-screen font-normal">
               <div className="bg-blue-950">
                    <div className="flex flex-col mx-auto px-8 lg:px-0 py-8 border-b border-b-zinc-300/50 lg:max-w-5xl">
                         <div className="flex flex-row justify-between items-center">
                              <img src="/logo.svg" alt="Logo da empresa" className="h-20" />
                              <button
                                   className="lg:hidden p-2 text-zinc-200"
                                   onClick={() => setMenuOpen(!menuOpen)}
                              >
                                   <Menu size={24} color="white" />
                              </button>
                              <nav className="lg:flex lg:items-center lg:gap-8 hidden bg-blue-950 p-5">
                                   <a href="/" className="py-2 font-semibold text-zinc-200">
                                        Home
                                   </a>
                                   <a href="/" className="py-2 font-semibold text-zinc-200">
                                        Usuários
                                   </a>
                                   <a href="/" className="py-2 font-semibold text-zinc-200">
                                        Produtos
                                   </a>
                                   <a
                                        href="/"
                                        className="lg:flex lg:items-center py-2 font-semibold text-zinc-200"
                                   >
                                        <Search size={24} color="white" />
                                   </a>
                              </nav>
                         </div>
                         {
                              menuOpen && (
                                   <nav className="flex flex-col items-center pt-5">
                                        <a href="/" className="py-2 font-semibold text-zinc-200">
                                             Home
                                        </a>
                                        <a href="/" className="py-2 font-semibold text-zinc-200">
                                             Usuários
                                        </a>
                                        <a href="/" className="py-2 font-semibold text-zinc-200">
                                             Produtos
                                        </a>
                                        <a
                                             href="/"
                                             className="lg:flex lg:items-center py-2 font-semibold text-zinc-200"
                                        >
                                             <Search size={24} color="#E4E4E7" />
                                        </a>
                                   </nav>
                              )
                         }
                    </div>
               </div>

               <div className="bg-blue-950 px-8 lg:px-0 rounded-b-3xl">
                    <div className="mx-auto py-8 lg:max-w-5xl font-semibold text-zinc-200 italic">
                         <span className="text-xl">Lista de usuários</span>
                    </div>
               </div>

               <div className="flex flex-1">
                    <div className="mx-auto py-5 lg:max-w-5xl">
                         {!users && (
                              <div className="flex justify-center items-center">
                                   <span className="text-xl">
                                        Carregando...
                                   </span>
                              </div>
                         )}
                         <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                              {visibleUsers?.map((user) => (
                                   <UserCard
                                        key={user.id}
                                        email={user.email}
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        username={user.username}
                                        website={user.website}
                                   />
                              ))}
                         </div>
                         {users && itemsToShow < users.length && (
                              <div className="flex justify-center items-center">
                                   <button onClick={handleShowMore} className="flex justify-center items-center gap-3 bg-blue-950 hover:bg-blue-900 mt-5 px-5 py-3 rounded-lg text-zinc-200">
                                        <Plus size={28} color="#E4E4E7" />
                                        Mostrar mais
                                   </button>
                              </div>
                         )}
                    </div>
               </div>

               <footer className="flex justify-center items-center bg-blue-950 py-5 rounded-t-3xl text-zinc-200">
                    © 2022 — Todos os direitos reservados
               </footer>
          </div>
     );
}
