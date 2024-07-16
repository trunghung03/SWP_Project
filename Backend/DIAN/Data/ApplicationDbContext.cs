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

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Diamond> Diamonds { get; set; }

    public virtual DbSet<Diamondattribute> Diamondattributes { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Orderdetail> Orderdetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Purchaseorder> Purchaseorders { get; set; }

    public virtual DbSet<Shell> Shells { get; set; }

    public virtual DbSet<Shellmaterial> Shellmaterials { get; set; }

    public virtual DbSet<Size> Sizes { get; set; }

    public virtual DbSet<Subdiamond> Subdiamonds { get; set; }

    public virtual DbSet<Warranty> Warranties { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasKey(e => e.ContentId).HasName("PK__ARTICLE__2907A87E1C3E8E55");

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
                .HasConstraintName("FK__ARTICLE__Employe__3D5E1FD2");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__CATEGORY__19093A2B611B8106");

            entity.ToTable("CATEGORY");

            entity.HasIndex(e => e.Name, "UQ__CATEGORY__737584F6193700FC").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Collection>(entity =>
        {
            entity.HasKey(e => e.CollectionId).HasName("PK__COLLECTI__7DE6BC24661D8D80");

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

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("PK__COMPANY__2D971C4CFFF25127");

            entity.ToTable("COMPANY");

            entity.Property(e => e.CompanyId)
                .HasMaxLength(254)
                .HasColumnName("CompanyID");
            entity.Property(e => e.Address)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.CompanyName)
                .IsRequired()
                .HasMaxLength(128);
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(254);
            entity.Property(e => e.MarkupPrice).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.PhoneNumber)
                .IsRequired()
                .HasMaxLength(20);
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__CUSTOMER__A4AE64B8EE208377");

            entity.ToTable("CUSTOMER");

            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.AccountType).HasMaxLength(128);
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
            entity.HasKey(e => e.DiamondId).HasName("PK__DIAMOND__23A8E7BB36B5DC60");

            entity.ToTable("DIAMOND");

            entity.Property(e => e.DiamondId).HasColumnName("DiamondID");
            entity.Property(e => e.DiamondAtrributeId).HasColumnName("DiamondAtrributeID");
            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status).HasDefaultValue(true);

            entity.HasOne(d => d.DiamondAtrribute).WithMany(p => p.Diamonds)
                .HasForeignKey(d => d.DiamondAtrributeId)
                .HasConstraintName("FK__DIAMOND__Diamond__6477ECF3");

            entity.HasOne(d => d.OrderDetail).WithMany(p => p.Diamonds)
                .HasForeignKey(d => d.OrderDetailId)
                .HasConstraintName("FK__DIAMOND__OrderDe__656C112C");
        });

        modelBuilder.Entity<Diamondattribute>(entity =>
        {
            entity.HasKey(e => e.DiamondAtrributeId).HasName("PK__DIAMONDA__24B6C435ECE62295");

            entity.ToTable("DIAMONDATTRIBUTE");

            entity.Property(e => e.DiamondAtrributeId).HasColumnName("DiamondAtrributeID");
            entity.Property(e => e.Carat).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Clarity)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Color)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Cut)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Shape)
                .IsRequired()
                .HasMaxLength(50);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__EMPLOYEE__7AD04FF1FF9E950E");

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

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PK__NOTIFICA__20CF2E32AD6B02A0");

            entity.ToTable("NOTIFICATION");

            entity.Property(e => e.NotificationId).HasColumnName("NotificationID");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Message).IsRequired();
            entity.Property(e => e.RecipientId).HasColumnName("RecipientID");
            entity.Property(e => e.RecipientRole)
                .IsRequired()
                .HasMaxLength(20);

            entity.HasOne(d => d.Recipient).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.RecipientId)
                .HasConstraintName("FK_Notification_Customer");

            entity.HasOne(d => d.RecipientNavigation).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.RecipientId)
                .HasConstraintName("FK_Notification_Employee");
        });

        modelBuilder.Entity<Orderdetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__ORDERDET__D3B9D30CC2A6EDF9");

            entity.ToTable("ORDERDETAIL");

            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");
            entity.Property(e => e.LineTotal).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.ShellMaterialId).HasColumnName("ShellMaterialID");
            entity.Property(e => e.Size).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Status).HasDefaultValue(true);

            entity.HasOne(d => d.Order).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ORDERDETA__Order__5EBF139D");

            entity.HasOne(d => d.Product).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ORDERDETA__Produ__5FB337D6");

            entity.HasOne(d => d.ShellMaterial).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.ShellMaterialId)
                .HasConstraintName("FK__ORDERDETA__Shell__60A75C0F");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__PRODUCT__2D10D14A263B273B");

            entity.ToTable("PRODUCT");

            entity.HasIndex(e => e.ProductCode, "UQ__PRODUCT__C2068389171EA894").IsUnique();

            entity.Property(e => e.ProductId).HasColumnName("productID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CollectionId).HasColumnName("CollectionID");
            entity.Property(e => e.LaborCost).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MainDiamondAtrributeId).HasColumnName("MainDiamondAtrributeID");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ProductCode)
                .IsRequired()
                .HasMaxLength(36)
                .HasColumnName("productCode");
            entity.Property(e => e.Status).HasDefaultValue(true);
            entity.Property(e => e.SubDiamondAtrributeId).HasColumnName("SubDiamondAtrributeID");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__PRODUCT__Categor__5BE2A6F2");

            entity.HasOne(d => d.Collection).WithMany(p => p.Products)
                .HasForeignKey(d => d.CollectionId)
                .HasConstraintName("FK__PRODUCT__Collect__5AEE82B9");

            entity.HasOne(d => d.MainDiamondAtrribute).WithMany(p => p.ProductMainDiamondAtrributes)
                .HasForeignKey(d => d.MainDiamondAtrributeId)
                .HasConstraintName("FK__PRODUCT__MainDia__5812160E");

            entity.HasOne(d => d.SubDiamondAtrribute).WithMany(p => p.ProductSubDiamondAtrributes)
                .HasForeignKey(d => d.SubDiamondAtrributeId)
                .HasConstraintName("FK__PRODUCT__SubDiam__59063A47");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.PromotionId).HasName("PK__PROMOTIO__52C42F2F94466633");

            entity.ToTable("PROMOTION");

            entity.Property(e => e.PromotionId).HasColumnName("PromotionID");
            entity.Property(e => e.Amount).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Code)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Purchaseorder>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__PURCHASE__C3905BAFA09B784B");

            entity.ToTable("PURCHASEORDER");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.OrderStatus)
                .IsRequired()
                .HasMaxLength(50)
                .HasDefaultValue("Unpaid");
            entity.Property(e => e.PaymentMethod)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.PhoneNumber)
                .IsRequired()
                .HasMaxLength(20);
            entity.Property(e => e.PromotionId).HasColumnName("PromotionID");
            entity.Property(e => e.ShippingAddress)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.DeliveryStaffNavigation).WithMany(p => p.PurchaseorderDeliveryStaffNavigations)
                .HasForeignKey(d => d.DeliveryStaff)
                .HasConstraintName("FK__PURCHASEO__Deliv__48CFD27E");

            entity.HasOne(d => d.Promotion).WithMany(p => p.Purchaseorders)
                .HasForeignKey(d => d.PromotionId)
                .HasConstraintName("FK__PURCHASEO__Promo__46E78A0C");

            entity.HasOne(d => d.SaleStaffNavigation).WithMany(p => p.PurchaseorderSaleStaffNavigations)
                .HasForeignKey(d => d.SaleStaff)
                .HasConstraintName("FK__PURCHASEO__SaleS__47DBAE45");

            entity.HasOne(d => d.User).WithMany(p => p.Purchaseorders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PURCHASEO__UserI__44FF419A");
        });

        modelBuilder.Entity<Shell>(entity =>
        {
            entity.HasKey(e => e.ShellId).HasName("PK__SHELL__DB5C54BD4F345399");

            entity.ToTable("SHELL");

            entity.Property(e => e.ShellId).HasColumnName("ShellID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.ShellMaterialId).HasColumnName("ShellMaterialID");
            entity.Property(e => e.Status).HasDefaultValue(true);
            entity.Property(e => e.Weight).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Product).WithMany(p => p.Shells)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__SHELL__ProductID__6D0D32F4");

            entity.HasOne(d => d.ShellMaterial).WithMany(p => p.Shells)
                .HasForeignKey(d => d.ShellMaterialId)
                .HasConstraintName("FK__SHELL__ShellMate__6E01572D");
        });

        modelBuilder.Entity<Shellmaterial>(entity =>
        {
            entity.HasKey(e => e.ShellMaterialId).HasName("PK__SHELLMAT__B375E41D3B646FB2");

            entity.ToTable("SHELLMATERIAL");

            entity.Property(e => e.ShellMaterialId).HasColumnName("ShellMaterialID");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status).HasDefaultValue(true);
        });

        modelBuilder.Entity<Size>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__SIZE__19093A2BC3F38B1B");

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
                .HasConstraintName("FK__SIZE__CategoryID__75A278F5");
        });

        modelBuilder.Entity<Subdiamond>(entity =>
        {
            entity.HasKey(e => e.DiamondId).HasName("PK__SUBDIAMO__23A8E7BBF057866A");

            entity.ToTable("SUBDIAMOND");

            entity.Property(e => e.DiamondId).HasColumnName("DiamondID");
            entity.Property(e => e.DiamondAtrributeId).HasColumnName("DiamondAtrributeID");
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Status).HasDefaultValue(true);

            entity.HasOne(d => d.DiamondAtrribute).WithMany(p => p.Subdiamonds)
                .HasForeignKey(d => d.DiamondAtrributeId)
                .HasConstraintName("FK__SUBDIAMON__Diamo__693CA210");
        });

        modelBuilder.Entity<Warranty>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__WARRANTY__D3B9D30C59B0FB43");

            entity.ToTable("WARRANTY");

            entity.Property(e => e.OrderDetailId)
                .ValueGeneratedNever()
                .HasColumnName("OrderDetailID");
            entity.Property(e => e.Status)
                .IsRequired()
                .HasMaxLength(128)
                .HasDefaultValue("Active");

            entity.HasOne(d => d.OrderDetail).WithOne(p => p.Warranty)
                .HasForeignKey<Warranty>(d => d.OrderDetailId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WARRANTY__OrderD__71D1E811");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}