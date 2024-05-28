﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Article> Articles { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Collection> Collections { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Diamond> Diamonds { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Orderdetail> Orderdetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Purchaseorder> Purchaseorders { get; set; }

    public virtual DbSet<Shellmaterial> Shellmaterials { get; set; }

    public virtual DbSet<Size> Sizes { get; set; }

    public virtual DbSet<Warranty> Warranties { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasKey(e => e.ContentId).HasName("PK__ARTICLE__2907A87E479995E2");

            entity.ToTable("ARTICLE");

            entity.Property(e => e.ContentId).HasColumnName("ContentID");
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.Image).HasMaxLength(255);
            entity.Property(e => e.Status).HasDefaultValue(true);
            entity.Property(e => e.Tag)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(255);

            entity.HasOne(d => d.EmployeeNavigation).WithMany(p => p.Articles)
                .HasForeignKey(d => d.Employee)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ARTICLE__Employe__164452B1");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__CATEGORY__19093A2B95E8FEB4");

            entity.ToTable("CATEGORY");

            entity.HasIndex(e => e.Name, "UQ__CATEGORY__737584F62DDF46B8").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Collection>(entity =>
        {
            entity.HasKey(e => e.CollectionId).HasName("PK__COLLECTI__7DE6BC24045AC66D");

            entity.ToTable("COLLECTION");

            entity.Property(e => e.CollectionId)
                .ValueGeneratedNever()
                .HasColumnName("CollectionID");
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(128);
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__CUSTOMER__A4AE64B8DC59C5FC");

            entity.ToTable("CUSTOMER");

            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(254);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(128);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Diamond>(entity =>
        {
            entity.HasKey(e => e.DiamondId).HasName("PK__DIAMOND__23A8E7BB276D7699");

            entity.ToTable("DIAMOND");

            entity.Property(e => e.DiamondId).HasColumnName("DiamondID");
            entity.Property(e => e.Carat).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Clarity).HasMaxLength(50);
            entity.Property(e => e.Color).HasMaxLength(50);
            entity.Property(e => e.Cost).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Cut).HasMaxLength(50);
            entity.Property(e => e.DiamondSize).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__EMPLOYEE__7AD04FF1913BDBE1");

            entity.ToTable("EMPLOYEE");

            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(254);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(128);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.Role)
                .IsRequired()
                .HasMaxLength(20);
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Orderdetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__ORDERDET__D3B9D30C68B10E28");

            entity.ToTable("ORDERDETAIL");

            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");
            entity.Property(e => e.LineTotal).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.ShellMaterialId).HasColumnName("ShellMaterialID");
            entity.Property(e => e.Size).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Status).HasDefaultValue(true);
            entity.Property(e => e.SubDiamondId).HasColumnName("SubDiamondID");

            entity.HasOne(d => d.Order).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ORDERDETA__Order__37A5467C");

            entity.HasOne(d => d.Product).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ORDERDETA__Produ__38996AB5");

            entity.HasOne(d => d.ShellMaterial).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.ShellMaterialId)
                .HasConstraintName("FK__ORDERDETA__Shell__398D8EEE");

            entity.HasOne(d => d.SubDiamond).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.SubDiamondId)
                .HasConstraintName("FK__ORDERDETA__SubDi__3A81B327");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__PRODUCT__2D10D14A4AD15641");

            entity.ToTable("PRODUCT");

            entity.HasIndex(e => e.ProductCode, "UQ__PRODUCT__C20683896CCF11D8").IsUnique();

            entity.Property(e => e.ProductId).HasColumnName("productID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.ChargeUp).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.CollectionId).HasColumnName("CollectionID");
            entity.Property(e => e.LaborPrice).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MainDiamondId).HasColumnName("MainDiamondID");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ProductCode)
                .IsRequired()
                .HasMaxLength(36)
                .HasColumnName("productCode");
            entity.Property(e => e.ShellAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status).HasDefaultValue(true);

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__PRODUCT__Categor__34C8D9D1");

            entity.HasOne(d => d.Collection).WithMany(p => p.Products)
                .HasForeignKey(d => d.CollectionId)
                .HasConstraintName("FK__PRODUCT__Collect__33D4B598");

            entity.HasOne(d => d.MainDiamond).WithMany(p => p.Products)
                .HasForeignKey(d => d.MainDiamondId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PRODUCT__MainDia__30F848ED");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.PromotionId).HasName("PK__PROMOTIO__52C42F2F93527612");

            entity.ToTable("PROMOTION");

            entity.Property(e => e.PromotionId).HasColumnName("PromotionID");
            entity.Property(e => e.Amount).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Code)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(true);

            entity.HasOne(d => d.Employee).WithMany(p => p.Promotions)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PROMOTION__Emplo__1B0907CE");
        });

        modelBuilder.Entity<Purchaseorder>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__PURCHASE__C3905BAFD39FFA8D");

            entity.ToTable("PURCHASEORDER");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.OrderStatus)
                .IsRequired()
                .HasMaxLength(50)
                .HasDefaultValue("Pending");
            entity.Property(e => e.PaymentMethod)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.PromotionId).HasColumnName("PromotionID");
            entity.Property(e => e.ShippingAddress)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Promotion).WithMany(p => p.Purchaseorders)
                .HasForeignKey(d => d.PromotionId)
                .HasConstraintName("FK__PURCHASEO__Promo__20C1E124");

            entity.HasOne(d => d.User).WithMany(p => p.Purchaseorders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PURCHASEO__UserI__1ED998B2");
        });

        modelBuilder.Entity<Shellmaterial>(entity =>
        {
            entity.HasKey(e => e.ShellMaterialId).HasName("PK__SHELLMAT__B375E41DA7AF3329");

            entity.ToTable("SHELLMATERIAL");

            entity.Property(e => e.ShellMaterialId).HasColumnName("ShellMaterialID");
            entity.Property(e => e.AmountAvailable).HasColumnType("decimal(18, 4)");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Size>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__SIZE__19093A2BF2B6CBE6");

            entity.ToTable("SIZE");

            entity.Property(e => e.CategoryId)
                .ValueGeneratedNever()
                .HasColumnName("CategoryID");
            entity.Property(e => e.MaxSize).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.MinSize).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Step).HasColumnType("decimal(5, 2)");

            entity.HasOne(d => d.Category).WithOne(p => p.Size)
                .HasForeignKey<Size>(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SIZE__CategoryID__4222D4EF");
        });

        modelBuilder.Entity<Warranty>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__WARRANTY__D3B9D30C716321EF");

            entity.ToTable("WARRANTY");

            entity.Property(e => e.OrderDetailId)
                .ValueGeneratedNever()
                .HasColumnName("OrderDetailID");
            entity.Property(e => e.Status).HasDefaultValue(true);

            entity.HasOne(d => d.OrderDetail).WithOne(p => p.Warranty)
                .HasForeignKey<Warranty>(d => d.OrderDetailId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WARRANTY__OrderD__3E52440B");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}