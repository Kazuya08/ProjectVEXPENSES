import { Hr } from '@/components/globals/Hr.styles';
import DataTable from '@/components/Suppliers/DataTable/DataTable';
import { Title } from '@/components/Suppliers/Title/title.style';

export default function SupplierPage() {

  return (
    <div>
      <Title>
        <h1>Fornecedores</h1>
        <p>Confira nossos fornecedores parceiros e escolha os mais alinhados às suas necessidades</p>
      </Title>

      <Hr />

      <div>
        <DataTable />
      </div>
    </div>
  );
}