using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDTO>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .ToListAsync();

                var activitiesMapped = _mapper.Map<List<ActivityDTO>>(activities);

                return Result<List<ActivityDTO>>.Success(activitiesMapped);
            }
        }
    }
}