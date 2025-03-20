using LibraryManager.Server.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LibraryManager.Server.Infrastructure
{
    public class LibraryContext : IdentityDbContext<User, IdentityRole<int>, int>
    {

        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<BorrowedBook> BorrowedBooks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Настройка таблицы Authors
            modelBuilder.Entity<Author>()
                .HasKey(a => a.AuthorId);

            modelBuilder.Entity<Author>()
                .Property(a => a.FirstName)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<Author>()
                .Property(a => a.Surname)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<Author>()
                .Property(a => a.BirthDate)
                .IsRequired(false);

            modelBuilder.Entity<Author>()
                .Property(a => a.Country)
                .HasMaxLength(255);

            // Настройка таблицы Genres
            modelBuilder.Entity<Genre>()
                .HasKey(g => g.GenreId);

            modelBuilder.Entity<Genre>()
                .Property(g => g.GenreName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Genre>()
                .HasIndex(g => g.GenreName)
                .IsUnique();

            modelBuilder.Entity<Genre>()
                .Property(g => g.GenreDescription)
                .HasColumnType("nvarchar(max)");

            // Настройка таблицы Books
            modelBuilder.Entity<Book>()
                .HasKey(b => b.BookId);

            modelBuilder.Entity<Book>()
                .Property(b => b.ISBN)
                .HasMaxLength(17);

            modelBuilder.Entity<Book>()
                .Property(b => b.Title)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<Book>()
                .Property(b => b.Description)
                .HasColumnType("nvarchar(max)");

            modelBuilder.Entity<Book>()
                .Property(b => b.CoverImage)
                .HasColumnType("nvarchar(max)");

            modelBuilder.Entity<Book>()
                .HasOne(b => b.Author)
                .WithMany(a => a.Books)
                .HasForeignKey(b => b.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Book>()
                .HasOne(b => b.Genre)
                .WithMany()
                .HasForeignKey(b => b.GenreId)
                .OnDelete(DeleteBehavior.Cascade);

            // Настройка таблицы Users
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .IsRequired()
                .HasConversion<string>();

            // Настройка таблицы BorrowedBooks
            modelBuilder.Entity<BorrowedBook>()
                .HasKey(bb => bb.BorrowId);

            modelBuilder.Entity<BorrowedBook>()
                .HasOne(bb => bb.Book)
                .WithMany()
                .HasForeignKey(bb => bb.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BorrowedBook>()
                .HasOne(bb => bb.User)
                .WithMany()
                .HasForeignKey(bb => bb.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Настройка таблицы UserRefreshToken
            modelBuilder.Entity<UserRefreshToken>()
                .HasKey(urt => urt.Id);

            modelBuilder.Entity<UserRefreshToken>()
                .Property(urt => urt.RefreshToken)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<UserRefreshToken>()
                .Property(urt => urt.ExpirationDate)
                .IsRequired();

            modelBuilder.Entity<UserRefreshToken>()
                .Property(urt => urt.UserId)
                .IsRequired();

            modelBuilder.Entity<UserRefreshToken>()
                .HasOne(urt => urt.User)
                .WithMany()
                .HasForeignKey(urt => urt.UserId);

            modelBuilder.Entity<IdentityUserLogin<int>>()
                .HasKey(x => new { x.UserId, x.LoginProvider, x.ProviderKey });

            modelBuilder.Entity<IdentityUserClaim<int>>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<IdentityUserRole<int>>()
                .HasKey(x => new { x.UserId, x.RoleId });

            modelBuilder.Entity<IdentityUserToken<int>>()
                .HasKey(x => new { x.UserId, x.LoginProvider, x.Name });
        }
    }
}
