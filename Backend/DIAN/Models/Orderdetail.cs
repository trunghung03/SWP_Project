﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Orderdetail
{
    public int OrderDetailId { get; set; }

    public int OrderId { get; set; }

    public decimal LineTotal { get; set; }

    public int ProductId { get; set; }

    public int? ShellMaterialId { get; set; }

    public decimal? Size { get; set; }

    public bool Status { get; set; }

    public virtual Purchaseorder Order { get; set; }

    public virtual Product Product { get; set; }

    public virtual Shellmaterial ShellMaterial { get; set; }

    public virtual Warranty Warranty { get; set; }
}