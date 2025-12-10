import { NavLink } from "react-router";

export function HomePage() {
    return (
        <div className="min-h-full flex flex-col pb-24 items-center justify-start py-12 px-6 sm:px-8 md:px-12">
            <div className="w-full max-w-4xl">
                <div className="bg-linear-to-r from-indigo-50 to-white rounded-xl p-6 sm:p-8 shadow-sm">
                    <div className="flex flex-col items-start gap-4">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">FairFree — Fair. Free. For Everyone.</h1>
                        <p className="text-gray-600 leading-relaxed">
                            A community-driven marketplace for sharing items and services with fairness and trust. Discover listings near you, give
                            away what you no longer need, and connect with neighbors.
                        </p>
                        <div className="w-full flex flex-col sm:flex-row gap-3 mt-3">
                            <NavLink
                                to="/explore"
                                className="inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium"
                                style={{
                                    color: "white",
                                    backgroundColor: "rgb(79 70 229)"
                                }}
                            >
                                Explore listings
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="inline-flex justify-center items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-50"
                            >
                                Create account
                            </NavLink>
                        </div>
                    </div>
                </div>

                <main className="mt-8 grid grid-cols-1 gap-6">
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <article className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-start gap-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 7v4a1 1 0 001 1h3m10-6v6a1 1 0 01-1 1h-3M5 21h14"
                                    />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-lg">Share items</h4>
                            <p className="text-sm text-gray-600">Give away items you no longer need to people who can use them.</p>
                        </article>

                        <article className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-start gap-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 5a2 2 0 012-2h2l2 3h4l2-3h2a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-lg">Discover near you</h4>
                            <p className="text-sm text-gray-600">Browse free listings filtered by location and categories.</p>
                        </article>

                        <article className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-start gap-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 11a1 1 0 011-1h3l2-3 2 3h5a1 1 0 011 1v5H2v-5z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-lg">Connect safely</h4>
                            <p className="text-sm text-gray-600">Message and coordinate pick-ups with clear, built-in controls.</p>
                        </article>
                    </section>

                    <section className="mt-2 p-4 rounded-lg bg-linear-to-r from-white to-slate-50 shadow-sm">
                        <h3 className="font-bold text-lg">How it works</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Post an item with a short description and optional pickup details. Claimers send a request and you choose who to meet. We
                            encourage clear communication and local meetups in safe public places.
                        </p>
                    </section>
                </main>

                <footer className="mt-8 text-center text-sm text-gray-500">Made with ❤️ by FairFree — share freely, share fairly.</footer>
            </div>
        </div>
    );
}
