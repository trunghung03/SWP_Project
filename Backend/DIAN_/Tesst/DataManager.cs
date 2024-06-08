namespace DIAN_.Tesst
{
    public class DataManager
    {
        public static List<Student> GetAllStudents()
        {
            return new List<Student>
            {
                new Student
                {
                    Name = "John",
                    LastName = "Doe",
                    Age = 25,
                    Gender = "Male"
                },
                new Student
                {
                    Name = "Jane",
                    LastName = "Doe",
                    Age = 22,
                    Gender = "female",
                },
                new Student
                {
                    Name = "John",
                    LastName = "Doe",
                    Age = 25,
                    Gender = "female",
                },
                new Student
                {
                    Name = "Jane",
                    LastName = "Doe",
                    Age = 22,
                    Gender = "female",
                },
            };
        }
    }
}
