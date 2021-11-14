using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Activity>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Activity>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Activity>> Handle(Command request, CancellationToken cancellationToken)
            {
                var newActivity = _context.Activities.Add(_mapper.Map<Activity>(request.Activity));
                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Activity>.Success(newActivity.Entity);
                return Result<Activity>.Success(newActivity.Entity);

            }
        }
    }
}