﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string Role { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public string LastName { get; set; }

    public string FirstName { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<Article> Articles { get; set; } = new List<Article>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Purchaseorder> PurchaseorderDeliveryStaffNavigations { get; set; } = new List<Purchaseorder>();

    public virtual ICollection<Purchaseorder> PurchaseorderSaleStaffNavigations { get; set; } = new List<Purchaseorder>();
}