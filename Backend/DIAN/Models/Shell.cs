﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Shell
{
    public int ShellId { get; set; }

    public int? ProductId { get; set; }

    public int? ShellMaterialId { get; set; }

    public decimal? Weight { get; set; }

    public decimal? Size { get; set; }

    public int AmountAvailable { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual Product Product { get; set; }

    public virtual Shellmaterial ShellMaterial { get; set; }
}