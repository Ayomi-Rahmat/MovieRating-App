import {
  Film,
  Sparkles,
  LogIn,
  LogOut,
  CreditCard,
} from "lucide-react";

function Navbar({
  onAddMovie,
  onLogin,
  onLogout,
  onPayment,
  loggedIn,
}) {
  return (
    <nav className="h-16 border-b border-[#332d24] flex items-center justify-between px-7 bg-[#12110f]">

      {/* Logo / App name */}
      <div className="flex items-center gap-2">
        <Film
          size={22}
          className="text-[#d9a441]"
        />

        <h1 className="text-xl font-semibold text-[#f5f1e8]">
          Movie Rating
        </h1>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-3">

        {/* PAYMENT BUTTON */}
        <button
          onClick={onPayment}
          className="flex items-center gap-2 px-4 py-2 border border-[#d9a441] rounded-md text-[#d9a441] hover:bg-[#d9a441] hover:text-black transition"
        >
          <CreditCard size={16} />
          Pay for VIP
        </button>

        {/* ADD MOVIE */}
        <button
          onClick={onAddMovie}
          className="flex items-center gap-2 px-4 py-2 border border-[#d9a441] rounded-md text-[#d9a441] hover:bg-[#d9a441] hover:text-black transition"
        >
          <Sparkles size={16} />
          Add Movie
        </button>

        {/* LOGIN / LOGOUT */}
        {loggedIn ? (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#d9a441] text-black rounded-md hover:bg-[#e5b85d] transition"
          >
            <LogOut size={16} />
            Log out
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="flex items-center gap-2 px-4 py-2 bg-[#d9a441] text-black rounded-md hover:bg-[#e5b85d] transition"
          >
            <LogIn size={16} />
            Log in
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;