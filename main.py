from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str

class Admin(BaseModel):
    username: str
    password: str

class Flight(BaseModel):
    flight_number: str
    departure_time: str
    arrival_time: str
    seats: int

class Booking(BaseModel):
    user_id: int
    flight_number: str

class Search(BaseModel):
    date: str
    time: str
conn = sqlite3.connect('flight.db')
c = conn.cursor()
c.execute('''
CREATE TABLE IF NOT EXISTS users (
    username text,
    password text
)
''')
c.execute('''
CREATE TABLE IF NOT EXISTS admins (
    username text,
    password text
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS flights (
    flight_number text,
    departure_time text,
    arrival_time text,
    seats integer
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS bookings (
    user_id integer,
    flight_number text
)
''')

@app.post("/signup/")
async def signup(user: User):
    c.execute("INSERT INTO users VALUES (?,?)", (user.username, user.password))
    conn.commit()
    return {"message": "User signed up successfully"}

@app.post("/login/")
async def login(user: User):
    c.execute("SELECT * FROM users WHERE username = ? AND password = ?", (user.username, user.password))
    result = c.fetchone()
    if result:
        return {"message": "User logged in successfully"}
    else:
        return {"message": "Invalid username or password"}

@app.post("/admin_login/")
async def admin_login(admin: Admin):
    c.execute("SELECT * FROM admins WHERE username = ? AND password = ?", (admin.username, admin.password))
    result = c.fetchone()
    if result:
        return {"message": "Admin logged in successfully"}
    else:
        return {"message": "Invalid username or password"}

@app.post("/add_flight/")
async def add_flight(flight: Flight):
    c.execute("INSERT INTO flights VALUES (?,?,?,?)", 
              (flight.flight_number, flight.departure_time, flight.arrival_time, flight.seats))
    conn.commit()
    return {"message": "Flight added successfully"}

@app.post("/remove_flight/")
async def remove_flight(flight: Flight):
    c.execute("DELETE FROM flights WHERE flight_number = ?", (flight.flight_number,))
    conn.commit()
    return {"message": "Flight removed successfully"}

@app.post("/book_ticket/")
async def book_ticket(booking: Booking):
    print("Received booking request:", booking.dict())
    c.execute("SELECT seats FROM flights WHERE flight_number = ?", (booking.flight_number,))
    seats = c.fetchone()[0]
    if seats > 0:
        c.execute("UPDATE flights SET seats = seats - 1 WHERE flight_number = ?", (booking.flight_number,))
        c.execute("INSERT INTO bookings VALUES (?,?)", (booking.user_id, booking.flight_number))
        conn.commit()
        return {"message": "Ticket booked successfully"}
    else:
        return {"message": "No seats available"}

@app.get("/my_bookings/{username}")
async def my_bookings(username: str):
    print(f"Received request for username: {username}")
    c.execute("SELECT rowid FROM users WHERE username = ?", (username,))
    user_id_tuple = c.fetchone()

    if user_id_tuple is None:
        return {"error": "User not found", "username": username}

    try:
        user_id = user_id_tuple[0]

        c.execute("SELECT * FROM bookings WHERE user_id = ?", (user_id,))
        bookings = c.fetchall()
        print(f"Bookings for username {username}: {bookings}")

        if not bookings:
            return {"message": "No bookings found for this user", "username": username}
        
        formatted_bookings = [{"user_id": booking[0], "flight_number": booking[1]} for booking in bookings]

        return {"message": "Bookings fetched successfully!", "bookings": formatted_bookings}
    except Exception as e:
        return {"error": f"An error occurred while fetching bookings: {str(e)}"}

@app.get("/view_bookings/")
async def view_bookings(flight: str):
    c.execute("SELECT * FROM bookings WHERE flight_number = ?", (flight,))
    bookings = c.fetchall()
    print(f"Bookings for flight {flight}: {bookings}")

    if not bookings:
        return {"message": "No bookings found for this flight"}

    return {"bookings": bookings}
@app.get("/search_flights/{date}/{time}")
async def search_flights(date: str, time: str):
    c.execute("SELECT * FROM flights WHERE departure_time >= ? AND arrival_time <= ?", (date + ' ' + time, date + ' ' + time))
    flights = c.fetchall()
    return {"flights": flights}



