type UserCardProps = {
     image?: string;
     firstname: string;
     lastname: string;
     username: string;
     email: string;
     website: string;
};

export function UserCard({ firstname, lastname, username, email, website }: UserCardProps) {
     return (
          <div className="flex flex-col border-zinc-300 border rounded-md overflow-hidden">
               {/* <img src={image} alt="Foto do usuário" className="flex flex-1" /> */}
               <div className="flex justify-center items-center bg-zinc-700 w-full h-52">
                    <span className="text-base text-zinc-200">Foto</span>
               </div>
               <div className="flex flex-col gap-3 p-5">
                    <span className="text-xl">{firstname} {lastname}</span>
                    <div className="flex flex-col">
                         <span>Usuário: <span className="font-bold">{username}</span></span>
                         <span className="max-w-full text-ellipsis truncate overflow-hidden">
                              E-mail: <a
                                   href={`mailto:${email}`}
                                   title={email}
                                   className="font-bold"
                              >
                                   {email}
                              </a>
                         </span>
                    </div>
                    <a href={website} className="font-bold">
                         {website}
                    </a>
               </div>
          </div>
     );
};