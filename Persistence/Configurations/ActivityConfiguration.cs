using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.ToTable("activities");
        
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(x => x.Title)
            .HasColumnName("title")
            .IsRequired();
        
        builder.Property(x => x.Date)
            .HasColumnName("date")
            .IsRequired();
        
        builder.Property(x => x.Description)
            .HasColumnName("description")
            .IsRequired();
        
        builder.Property(x => x.Category)
            .HasColumnName("category")
            .IsRequired();

        builder.Property(x => x.IsCancelled)
            .HasColumnName("is_cancelled");

        builder.Property(x => x.City)
            .HasColumnName("city")
            .IsRequired();
        
        builder.Property(x => x.Venue)
            .HasColumnName("venue")
            .IsRequired();

        builder.Property(x => x.Latitude)
            .HasColumnName("latitude");
        
        builder.Property(x => x.Longitude)
            .HasColumnName("longitude");
    }
}