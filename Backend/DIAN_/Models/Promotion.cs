﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Promotion
{
    public int PromotionId { get; set; }

    public string Name { get; set; }

    public decimal Amount { get; set; }

    public DateTime ValidFrom { get; set; }

    public DateTime ValidTo { get; set; }

    public string Description { get; set; }

    public string Code { get; set; }

    public int EmployeeId { get; set; }

    public bool Status { get; set; }

    public virtual Employee Employee { get; set; }

    public virtual ICollection<Purchaseorder> Purchaseorders { get; set; } = new List<Purchaseorder>();
}