﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Shellmaterial
{
    public int ShellMaterialId { get; set; }

    public string Name { get; set; }

    public decimal AmountAvailable { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();
}