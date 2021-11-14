using System;
using System.Collections.Generic;
using System.Linq;
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
    public class Edit
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
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if(activity == null) return null;

                var updatedActivity = _mapper.Map(request.Activity, activity);
                // If we don't change and fields, it is also going to be 0
                var result = await _context.SaveChangesAsync() > 0;

                if(result) return Result<Activity>.Success(updatedActivity);
                return Result<Activity>.Failure("Activity could not be updated");
            }
        }
    }
}