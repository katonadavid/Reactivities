using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly DataContext _context;

        public ActivityController(DataContext context)
        {
            _context = context;
        }

        public IActionResult GetAllActivities()
        {
            var activities = _context.Activities.ToList();
            return Ok(activities);
        }
    }
}