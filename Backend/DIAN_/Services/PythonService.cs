using System.Diagnostics;

namespace DIAN_.Services
{
    public class PythonService
    {
        private readonly string _pythonPath;
        private readonly string _scriptPath;

        public PythonService(string pythonPath, string scriptPath)
        {
            _pythonPath = pythonPath;
            _scriptPath = scriptPath;
        }

        public string ExecutePythonScript(string jsonData)
        {
            var start = new ProcessStartInfo
            {
                FileName = _pythonPath,
                Arguments = $"{_scriptPath} \"{jsonData.Replace("\"", "\\\"")}\"", // Properly escape the quotes here
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            };

            using (var process = Process.Start(start))
            {
                using (var reader = process.StandardOutput)
                {
                    var result = reader.ReadToEnd();
                    process.WaitForExit();

                    if (process.ExitCode != 0)
                    {
                        var error = process.StandardError.ReadToEnd();
                        throw new Exception($"Python script error: {error}");
                    }

                    return result.Trim();
                }
            }
        }
    }
}
