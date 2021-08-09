using Microsoft.EntityFrameworkCore;
using TripCalculator.Domain.Lib;

namespace TripCalculator.Domain.CodeFirst
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
          : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripUser> TripsUsers { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>()
                .HasOne(a => a.User)
                .WithOne(b => b.ApplicationUser)
                .HasForeignKey<ApplicationUser>(x => x.UserId);

            modelBuilder.Entity<Trip>()
                .HasOne(x => x.ApplicationUser)
                .WithMany(x => x.Trips)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}