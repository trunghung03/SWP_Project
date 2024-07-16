using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.Services
{
    public class GoodsService : IGoodsService
    {
        private readonly IDiamondAttributeRepository _diamondAttributeRepository;
        private readonly IProductRepository _productRepository;
        private readonly ISubDiamondRepository  _subDiamondRepository;
        private readonly IDiamondRepository _diamondRepository;

        public GoodsService(IDiamondAttributeRepository diamondAttributeRepository, IProductRepository productRepository, ISubDiamondRepository subDiamondRepository, IDiamondRepository diamondRepository)
        {
            _diamondAttributeRepository = diamondAttributeRepository;
            _productRepository = productRepository;
            _subDiamondRepository = subDiamondRepository;
            _diamondRepository = diamondRepository;
        }

        //create diammond attribue, diamond at the same time (if diamond attribute does not exist => create diamond attribute)
        public async Task<DiamondDto> CreateMainDiamondAsync(CreateDiamondRequestDto requestDto) //convert to dto later
        {
            var diamondModel = requestDto.ToDiamondFromCreateDTO();
            
            var attributeExists = await FindDiamondAttributeAsync(requestDto);

            Diamondattribute existingAttribute;
            if (!attributeExists)
            {
                var newAttribute = new Diamondattribute
                {
                    Shape = requestDto.Shape,
                    Color = requestDto.Color,
                    Clarity = requestDto.Clarity,
                    Cut = requestDto.Cut,
                    Carat = requestDto.Carat
                };

                existingAttribute = await _diamondAttributeRepository.CreateDiamondAttributeAsync(newAttribute);
            }
            else
            {
                existingAttribute = await _diamondAttributeRepository.GetDiamondAttributeIdByDetailsAsync(
                    requestDto.Shape, requestDto.Color, requestDto.Clarity, requestDto.Cut, requestDto.Carat);
            }

            var newDiamond = new Diamond
            {
                MainDiamondAtrributeId = existingAttribute.DiamondAtrributeId,
                Price = requestDto.Price,
                Status = requestDto.Status,
                CertificateScan = requestDto.CertificateScan
                //order detail null for now
            };

            var diamondDto = await _diamondRepository.AddDiamondAsync(newDiamond);

            return diamondDto.ToDiamondDTO();
        }

        //create diammond attribue, diamond at the same time (if diamond attribute does not exist => create diamond attribute)
        public async Task<SubDiamondDto> CreateSubDiamondAsync(CreateSubDiamondRequestDto requestDto) //convert to dto later
        {

            var diamondModel = requestDto.ToSubDiamondFromCreateDTO();
            var attributeExists = await FindSubDiamondAttributeAsync(requestDto);

            Diamondattribute existingAttribute;
            if (!attributeExists)
            {
                var newAttribute = new Diamondattribute
                {
                    Shape = requestDto.Shape,
                    Color = requestDto.Color,
                    Clarity = requestDto.Clarity,
                    Cut = requestDto.Cut,
                    Carat = requestDto.Carat
                };

                existingAttribute = await _diamondAttributeRepository.CreateDiamondAttributeAsync(newAttribute);
            }
            else
            {
                existingAttribute = await _diamondAttributeRepository.GetDiamondAttributeIdByDetailsAsync(
                    requestDto.Shape, requestDto.Color, requestDto.Clarity, requestDto.Cut, requestDto.Carat);
            }

            var newDiamond = new Subdiamond
            {
                DiamondAtrributeId = existingAttribute.DiamondAtrributeId,
                Price = requestDto.Price,
                Status = requestDto.Status,
                AmountAvailable = requestDto.AmountAvailable
            };

            var diamondDto = await _subDiamondRepository.CreateAsync(newDiamond);

            return diamondDto.ToSubDiamondDTO();
        }



        private async Task<bool> FindDiamondAttributeAsync(CreateDiamondRequestDto requestDto)
        {
            var allAttributes = await _diamondAttributeRepository.GetDiamondAttributesAsync();
            return allAttributes.Any(attr =>
                attr.Shape == requestDto.Shape &&
                attr.Color == requestDto.Color &&
                attr.Clarity == requestDto.Clarity &&
                attr.Cut == requestDto.Cut &&
                attr.Carat == requestDto.Carat);
        }
        private async Task<bool> FindSubDiamondAttributeAsync(CreateSubDiamondRequestDto requestDto)
        {
            var allAttributes = await _diamondAttributeRepository.GetDiamondAttributesAsync();
            return allAttributes.Any(attr =>
                attr.Shape == requestDto.Shape &&
                attr.Color == requestDto.Color &&
                attr.Clarity == requestDto.Clarity &&
                attr.Cut == requestDto.Cut &&
                attr.Carat == requestDto.Carat);
        }

        //handle logic for creating product later
        public async Task<ProductDTO> CreateProductAsync(CreateProductRequestDTO createProductRequestDTO)
        {
            var productModel = createProductRequestDTO.ToProductFromCreateDTO();
            var mainDiamondExists = await _productRepository.ExistsMainDiamondAttributeAsync(createProductRequestDTO.MainDiamondAttributeId);
            var subDiamondExists = await _productRepository.ExistsSubDiamondAttributeAsync(createProductRequestDTO.SubDiamondAttributeId);

            if (!mainDiamondExists)
            {
                throw new ValidationException("This diamond does not exist.");
            }

            if (!subDiamondExists)
            {
                throw new ValidationException("This diamond does not exist.");
            }
            var product = await _productRepository.CreateAsync(productModel);
            return product.ToProductDTO();
        }


        public int GetMainDiamondsCount()
        {
            throw new NotImplementedException();
        }
    }
}
