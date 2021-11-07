using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Activity>
        {
            public NewActivityDTO Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Activity>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                var newActivity = _context.Activities.Add(_mapper.Map<Activity>(request.Activity));

                await _context.SaveChangesAsync();
                
                // This way we let mediatr know that the command has been processed, this equals returning nothing
                return newActivity.Entity;
            }
        }
    }
}