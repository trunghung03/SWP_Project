﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Notification
{
    public int NotificationId { get; set; }

    public string RecipientRole { get; set; }

    public int RecipientId { get; set; }

    public string Message { get; set; }

    public bool IsDelivered { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool MarkRead { get; set; }
}