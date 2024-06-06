using DIAN_.Models;

namespace DIAN_.testtt
{
    public class DataManager
    {
        public static List<Students> GetAll()
        {
            return new List<Students>
            {
                new Students { Age = 1, Gender = "nu", LastName = "duyen", Name = "ded" },
                 new Students { Age = 1, Gender = "nu", LastName = "duyen", Name = "ded" },
                  new Students { Age = 1, Gender = "nu", LastName = "duyen", Name = "ded" },
                   new Students { Age = 1, Gender = "nu", LastName = "duyen", Name = "ded" },
                    new Students { Age = 1, Gender = "nu", LastName = "duyen", Name = "ded" },
            };
        }
    }
}
