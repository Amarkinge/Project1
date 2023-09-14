using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace WebApplication1.Data
{


    public class AppDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "server=localhost;database=busrental2;uid=root;password=Pankaj@123";
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 34));
            optionsBuilder.UseMySql(connectionString, serverVersion);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Location> Locations { get; set; }

        public DbSet<Booking> Bookings { get; set; }

    }


}
